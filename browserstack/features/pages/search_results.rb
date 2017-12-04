module Pages
  class SearchResults < Base
    set_url '/pages/search-results'

    element :search_results_container, 'ul#isp_search_results_container'

    section :search_bar, Sections::SearchBar, '.search-menu'

    attr_accessor :query

    def initialize(query:"")
      @query = query
      super()
    end

    def has_result_for?(id:, name:)
      result = has_text?(name) && has_search_results_container?
      within(search_results_container) do
        result &&= page.has_css?(%Q{li[product_id="#{id}"]})
      end

      result
    end

    def click_result_for(id)
      # byebug
      within(search_results_container) do
        find(%Q{li[product_id="#{id}"] .isp_product_image_wrapper}).click
        #   case Capybara.current_driver
        #   when :webkit,  :quiet_webkit
        #     first(:link).trigger('click') # https://github.com/thoughtbot/capybara-webkit/issues/808
        #   else
        #     first(:link).click
        #   end
        # end
      end
    end
  end
end