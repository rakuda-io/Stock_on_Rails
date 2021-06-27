class AddCompanynameAndSectorAndCountryAndUrlToHoldings < ActiveRecord::Migration[6.1]
  def change
    add_column :holdings, :company_name, :string, after: :ticker
    add_column :holdings, :sector, :string, after: :dividend
    add_column :holdings, :country, :string, after: :sector
    add_column :holdings, :url, :string, after: :country
  end
end
