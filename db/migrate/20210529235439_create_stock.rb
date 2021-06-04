class CreateStock < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.string :company, null: false
      t.string :url, null: false
      t.integer :dividend, null: false

      t.timestamps
    end
  end
end
