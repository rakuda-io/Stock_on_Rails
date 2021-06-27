class AddTotalDividendToHoldings < ActiveRecord::Migration[6.1]
  def change
    add_column :holdings, :total_dividend, :float, after: :dividend
  end
end
