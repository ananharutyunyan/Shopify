module Pages
  module Sections
    class SearchBar < SitePrism::Section
      element :search_field, "input[name='q']"

      def search(query)
        search_field.set(query)

        case Capybara.current_driver
        when :webkit,  :quiet_webkit
          search_field.send_keys(:enter)
        else
          search_field.native.send_key(:enter)
        end
      end


    end
  end
end