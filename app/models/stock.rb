class Stock < ApplicationRecord
  validates :ticker, :url, presence: true

  private
    # finviz.comから最新の株データを取得するためのメソッド
    def self.get_stock_data
      agent = Mechanize.new
      next_url = ""
      page = 0 #デバッグ用

      while true do
        current_page = agent.get("https://finviz.com/screener.ashx?v=111" + next_url)
        tickers = current_page.search(".screener-link-primary").map {|ticker| ticker.text }
        urls = current_page.search(".screener-body-table-nw a").map { |url| url.get_attribute('href') }.uniq

        page += 1 #デバッグ用
        puts "●●●●●●●●●●●●●●● #{page} ページ目●●●●●●●●●●●●●●●" #デバッグ用

        tickers.zip(urls) do |ticker, url|
          data = self.new({ticker: ticker, url: "https://finviz.com/" + url})
          data.save
        end

        next_link = current_page.at(".screener_pagination a:last-child")
        if next_link.text == "next"
          next_url = next_link.get_attribute('href').match(/[&].+/).to_s
        else
          puts "●●●●●●●●●●●●●●● 全データ取り込み完了 ●●●●●●●●●●●●●●● "
          break
        end
      end
    end

end