class RemoveColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :stocks, :company, :string
    remove_column :stocks, :dividend, :integer
  end
end
