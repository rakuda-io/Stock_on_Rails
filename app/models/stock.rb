class Stock < ApplicationRecord
  validates :ticker, :url, presence: true

  private
    # finviz.comから最新の株データを取得するためのメソッド
    def self.get_all_stock_data
      agent = Mechanize.new
      next_url = ""
      page = 1 #デバッグ用

      # Nextリンクがなくなるまで繰り返す
      while true do
        puts "●●●●●●●●●●●●●●● #{page} ページ目 ●●●●●●●●●●●●●●●" #デバッグ用
        page += 1 #デバッグ用

        # 一覧ページ（current_page）のデータを一時的に取得
        current_page = agent.get("https://finviz.com/screener.ashx?v=111" + next_url)
        tickers = current_page.search(".screener-link-primary").map {|ticker| ticker.text }
        urls = current_page.search(".screener-body-table-nw a").map { |url| url.get_attribute('href') }.uniq

        # 取得した一覧ページのデータを使って個別ページ（detailed_page）のデータを取得して各カラムに保存
        tickers.zip(urls) do |ticker, url|
          detailed_page = agent.get(url)
          company_name = detailed_page.search("td")[29].text
          sector = detailed_page.search("td")[30].search("a").first.text
          country = detailed_page.search("td")[30].search("a").last.text
          data = self.new(
            ticker: ticker,
            url: "https://finviz.com/" + url,
            company_name: company_name,
            sector: sector,
            country: country,
          )
          data.save
        end

        # 次のページのリンクを取得して変数next_linkにURLの必要部分のみを正規表現で取り出し代入
        # また、ページネーションがあるか分岐させてなかったらbreakさせる（すなわち全データ取り込み完了）
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