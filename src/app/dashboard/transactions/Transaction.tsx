import DataTable from "@/components/common/DataTable";
import TransactionDashboard from "@/components/dashboard/transactions/TransactionDashboard";

const balanceData = [
  { day: 'Mon', balance: 35000 },
  { day: 'Tue', balance: 32000 },
  { day: 'Wed', balance: 37000 },
  { day: 'Thu', balance: 42000 },
  { day: 'Fri', balance: 38000 },
  { day: 'Sat', balance: 41000 },
  { day: 'Sun', balance: 42487.25 },
]

const transactions = [
  { id: 1, name: 'Shopify', amount: -18.49, date: 'August 18', category: 'Food & Drinks', account: 'Visa 9487' },
  { id: 2, name: 'Gacha Games', amount: -199.99, date: 'June 22', category: 'Finance', account: 'Mastercard 1212' },
  { id: 3, name: 'Stripe', amount: 20.99, date: 'May 11', category: 'Entertainment', account: 'Visa 9487' },
  { id: 4, name: 'Figma', amount: -15.00, date: 'April 20', category: 'Groceries', account: 'Visa 9487' },
  { id: 5, name: 'GG Fried Chicken', amount: -45.05, date: 'April 18', category: 'Subscription', account: 'Mastercard 1212' },
  { id: 6, name: 'Uber Foods', amount: -50.25, date: 'March 8', category: 'Income', account: 'Mastercard 1212' },
]

const budgets = [
  { name: 'Netflix Subscription', amount: 25, total: 50 },
  { name: 'Store Grocery', amount: 8, total: 200 },
  { name: 'AWS Server Rent', amount: 2500, total: 5000 },
  { name: 'New 21" Monitor', amount: 999, total: 1200 },
]

const Data = () => {

  const fields = [
    { key: "id", label: "ID" },
    { key: "userId", label: "User Id" },
    { key: "amount", label: "Amount" },
    { key: "categoryId", label: "Category Id" },
    { key: "categoryName", label: "Category Name" },
    { key: "categoryType", label: "Category Type" },
  ]

  return (
    <DataTable
      heading="Transactions"
      apiResource="transaction"
      nameKey="id"
      fields={fields}
      AddComponent={null}
      UpdateComponent={null}
    />
  )
}

export default function Transaction() {
  return (
    <div>
      <TransactionDashboard
        balanceData={balanceData}
        transactions={transactions}
        budgets={budgets}
        table={<Data />}
      />
    </div>
  )
}
