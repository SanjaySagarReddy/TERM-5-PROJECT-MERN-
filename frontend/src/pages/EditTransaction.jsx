import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, DollarSign, Tag, Calendar, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

const EditTransaction = () => {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    date: '',
    note: ''
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    fetchTransaction()
  }, [id])

  const fetchTransaction = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/transactions')
      const transaction = response.data.transactions.find(t => t._id === id)
      
      if (!transaction) {
        toast.error('Transaction not found')
        navigate('/dashboard')
        return
      }

      setFormData({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount.toString(),
        date: new Date(transaction.date).toISOString().split('T')[0],
        note: transaction.note || ''
      })
    } catch (error) {
      console.error('Error fetching transaction:', error)
      toast.error('Failed to load transaction')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await axios.put(`/api/transactions/${id}`, {
        ...formData,
        amount: parseFloat(formData.amount)
      })
      
      toast.success('Transaction updated successfully!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Error updating transaction:', error)
      toast.error(error.response?.data?.message || 'Failed to update transaction')
    } finally {
      setSubmitting(false)
    }
  }

  const commonCategories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Groceries',
    'Gas',
    'Salary',
    'Freelance',
    'Investment',
    'Gift',
    'Other'
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Transaction</h1>
          <p className="text-gray-600 dark:text-gray-400">Update transaction details</p>
        </div>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`relative flex cursor-pointer rounded-lg p-4 border-2 transition-colors ${
                formData.type === 'income' 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Income</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Money coming in</div>
                  </div>
                </div>
              </label>

              <label className={`relative flex cursor-pointer rounded-lg p-4 border-2 transition-colors ${
                formData.type === 'expense' 
                  ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary-100 dark:bg-secondary-800 rounded-full">
                    <DollarSign className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Expense</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Money going out</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="category"
                name="category"
                type="text"
                required
                value={formData.category}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Enter category"
                list="categories"
              />
              <datalist id="categories">
                {commonCategories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                required
                value={formData.amount}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Note (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="note"
                name="note"
                rows={3}
                value={formData.note}
                onChange={handleChange}
                className="input-field pl-10 resize-none"
                placeholder="Add a note about this transaction"
                maxLength={100}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formData.note.length}/100 characters
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Updating Transaction...
                </div>
              ) : (
                'Update Transaction'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTransaction
