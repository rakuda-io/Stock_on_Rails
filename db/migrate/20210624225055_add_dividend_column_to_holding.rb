class AddDividendColumnToHolding < ActiveRecord::Migration[6.1]
  def change
    add_column :holdings, :dividend, :float, after: :quantity
    remove_column :stocks, :dividend, :float
  end
end
