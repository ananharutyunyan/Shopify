module Pages
  class Product < Base
    set_url '/products/{handle}'

    element :product_heading, 'h1.product_name', match: :first

    element :add_to_cart_button, 'button#atc', match: :first
    element :desktop_add_to_cart_button, 'form.product-form__desktop button.atc'
    element :mobile_add_to_cart_button, 'form.product-form__mobile button.atc'
    element :bottom_add_to_cart_button, 'form.product-form__bottom button.atc'
    element :tab2_add_to_cart_button, 'form.product-form__tab2 button.atc'

    section :search_bar, Sections::SearchBar, '.search-menu'

    # don't know why, but @home.loaded? never returns true even after waiting 20 seconds
    # load_validation { has_welcome? }
    # load_validation { has_search_bar? }

    attr_accessor :product

    def initialize(product:{})
      @product = product
      super()
    end

    def title
      product[:title]
    end

    def handle
      product[:handle] || title.downcase.dasherize.gsub(/ +/, '-').gsub(/--+/, '-')
    end

    def id
      product[:id]
    end

    def load
      super(handle: handle)
    end

    def showing_product_handle?
      result = displayed?(handle: handle)
      puts "on #{current_url} not #{handle}" unless result
      result
    end

    def showing_product_heading?
      result = (product_heading.text.downcase == title.downcase)
      puts "product_heading is #{product_heading.text}" unless result
      result
    end

    def click_add_to_cart
      add_to_cart_button.click
    end

    def has_add_to_cart_button_with_identifier?(identifier)
      element_exists?("form.product-form__#{identifier} button.atc", visible: true)
    end

  end
end