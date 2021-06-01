class Stock < ApplicationRecord
  validates :ticker, :url, presence: true

  require 'mechanize'

  def self.stock_urls
    agent = Mechanize.new
    next_url = ""
    stocks = []

    while true do
      current_page = agent.get("https://finviz.com/screener.ashx?v=111" + next_url)
      tickers = current_page.search(".screener-link-primary").map {|ticker| ticker.text }
      urls = current_page.search(".screener-body-table-nw a").map { |url| url.get_attribute('href') }.uniq

      tickers.zip(urls) do |ticker, url|
        stocks << "#{ticker}: https://finviz.com/#{url}"
      end

      next_link = current_page.at(".screener_pagination a:last-child")
      if next_link.text == "next"
        next_url = next_link.get_attribute('href').match(/[&].+/).to_s
      else
        break
      end
    end
  end
end