class AddReferencesToHoldings < ActiveRecord::Migration[6.1]
  def change
    add_reference :holdings, :user, foreign_key: true, null: false
  end
end
