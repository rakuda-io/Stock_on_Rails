class RemoveColumnToHoldings < ActiveRecord::Migration[6.1]
  def change
    remove_column :holdings, :company_name
    remove_column :holdings, :dividend
  end
end
