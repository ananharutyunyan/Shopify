require_relative 'sections/search_bar'

module Pages
  class Base < SitePrism::Page
    section :search_bar, Pages::Sections::SearchBar, '.search-menu'
  end
end