class Stock < ApplicationRecord
  validates :ticker, :company, :url, presence: true

  def self.stock_urls
    links = []
    agent = Stock.new
    
  end
end