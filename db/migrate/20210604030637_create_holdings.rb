class CreateHoldings < ActiveRecord::Migration[6.1]
  def change
    create_table :holdings do |t|
      t.string :ticker, null: false
      t.string :company_name, null: false
      t.float :quantity, null: false
      t.integer :dividend

      t.timestamps
    end
  end
end
