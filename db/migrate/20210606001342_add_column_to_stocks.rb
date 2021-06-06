

class AddColumnToStocks < ActiveRecord::Migration[6.1]
  def change
    add_column :stocks, :company_name, :string, null: false, after: :ticker
    add_column :stocks, :sector, :string, null: false, after: :company_name
    add_column :stocks, :country, :string, null: false, after: :sector
    add_column :stocks, :dividend, :float, after: :country
  end
end
