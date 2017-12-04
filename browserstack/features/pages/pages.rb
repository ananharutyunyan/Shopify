module Pages
  def visit_page(name, args = {}, &block)
    build_page(name).tap do |page|
      page.load(args)
      block.call page if block
    end
  end

  def on_page(name, args = {}, &block)
    build_page(name).tap do |page|
      expect(page).to be_displayed(args)
      block.call page if block
    end
  end

  def build_page(name)
    name = name.to_s.camelize if name.is_a? Symbol
    Object.const_get("Pages::#{name}").new
  end
end
