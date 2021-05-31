class Stock < ApplicationRecord
  validates :ticker, :company, :url, presence: true

  require 'mechanize'

  def self.stock_urls
    agent = Mechanize.new
    current_page = agent.get("https://finviz.com/screener.ashx")
    tickers = current_page.search(".screener-link-primary").map {|ticker| ticker.text }
    urls = current_page.search(".screener-body-table-nw a").map { |url| url.get_attribute('href') }.uniq

    tickers.zip(urls) do |ticker, url|
      puts "#{ticker}: https://finviz.com/#{url}"
    end
  end
end