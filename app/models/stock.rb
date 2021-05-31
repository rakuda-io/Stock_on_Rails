class Stock < ApplicationRecord
  validates :ticker, :company, :url, presence: true

  require 'mechanize'

  # def self.stock_urls
    agent = Mechanize.new
    next_url = ""
    next_url_array = []

    while true do
      current_page = agent.get("https://finviz.com/" + next_url)
      tickers = current_page.search(".screener-link-primary").map {|ticker| ticker.text }
      urls = current_page.search(".screener-body-table-nw a").map { |url| url.get_attribute('href') }.uniq

      tickers.zip(urls) do |ticker, url|
        puts "#{ticker}: https://finviz.com/#{url}"
      end

      next_link = current_page.at(".screener_pagination a:last-child")
      if next_link.text == "next"
        next_url_array = next_link.get_attribute('href')
      else
        next_url_array = []
      end

      next_url = next_url_array.join

      break unless next_url
    end
# end