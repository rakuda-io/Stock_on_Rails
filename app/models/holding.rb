class Holding < ApplicationRecord
  belongs_to :user

  validates :ticker, :company_name, :quantity, presence: true
end
