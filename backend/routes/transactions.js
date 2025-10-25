const express = require('express');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/transactions
// @desc    Get all transactions for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = { user: req.user._id };
    
    if (type) filter.type = type;
    if (category) filter.category = new RegExp(category, 'i');
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments(filter);

    res.json({
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/transactions/stats
// @desc    Get transaction statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const filter = { user: req.user._id };
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const stats = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const income = stats.find(stat => stat._id === 'income') || { total: 0, count: 0 };
    const expense = stats.find(stat => stat._id === 'expense') || { total: 0, count: 0 };
    const balance = income.total - expense.total;

    res.json({
      income: income.total,
      expense: expense.total,
      balance,
      transactionCount: income.count + expense.count
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/transactions/categories
// @desc    Get expense categories breakdown
// @access  Private
router.get('/categories', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const filter = { user: req.user._id, type: 'expense' };
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const categories = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
router.post('/', [
  auth,
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('category').trim().isLength({ min: 1, max: 30 }).withMessage('Category is required and must be less than 30 characters'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('date').optional().isISO8601().withMessage('Date must be valid'),
  body('note').optional().isLength({ max: 100 }).withMessage('Note must be less than 100 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { type, category, amount, date, note } = req.body;

    const transaction = new Transaction({
      user: req.user._id,
      type,
      category,
      amount,
      date: date ? new Date(date) : new Date(),
      note
    });

    await transaction.save();

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  Private
router.put('/:id', [
  auth,
  body('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('category').optional().trim().isLength({ min: 1, max: 30 }).withMessage('Category must be less than 30 characters'),
  body('amount').optional().isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('date').optional().isISO8601().withMessage('Date must be valid'),
  body('note').optional().isLength({ max: 100 }).withMessage('Note must be less than 100 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { type, category, amount, date, note } = req.body;
    const updateData = {};

    if (type) updateData.type = type;
    if (category) updateData.category = category;
    if (amount) updateData.amount = amount;
    if (date) updateData.date = new Date(date);
    if (note !== undefined) updateData.note = note;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({
      message: 'Transaction updated successfully',
      transaction
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
