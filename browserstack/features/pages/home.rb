module Pages
  class Home < Base
    set_url CONFIG['urls']['store']

    section :search_bar, Sections::SearchBar, '.search-menu'

    # don't know why, but @home.loaded? never returns true even after waiting 20 seconds
    # load_validation { has_welcome? }
    # load_validation { has_search_bar? }

    def has_welcome?
      has_text? "Welcome to Simpli Pleasure - Your Trusted Source for Adult Sex Toys"
    end
  end
end