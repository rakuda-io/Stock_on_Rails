class Stock < ApplicationRecord
  validates :ticker, :company, :url, presence: true
end