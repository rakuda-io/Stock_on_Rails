class Holding < ApplicationRecord
  belongs_to :user
  validates :ticker, :quantity, presence: true
end
