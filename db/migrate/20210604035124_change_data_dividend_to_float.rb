class ChangeDataDividendToFloat < ActiveRecord::Migration[6.1]
  def change
    change_column :holdings, :dividend, :float
  end
end
