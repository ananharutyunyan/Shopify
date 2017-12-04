module SP
  module Products
    extend self

    PRODUCTS = {
      384405472 => {
                       id: 384405472,
                    title: "Senso Cock Rings - 6 Pack",
                   handle: "senso-cock-rings-6-pack-se",
                   vendor: "California Exotics",
          template_suffix: "",
           variants_count: 1,
                 variants: [
              {
                       id: 1022327956,
                      sku: "SE143200",
                  option1: "Senso Cock Rings - 6 Pack",
                  option2: nil,
                  option3: nil
              }
          ]
      },

      384447184 => {
                       id: 384447184,
                    title: "Clone-A-Willy Vibrator Moulding Kit Neon Purple",
                   handle: "clone-a-willy-vibrator-moulding-kit-neon-purple",
                   vendor: "Empire Labs",
          template_suffix: "bottom",
           variants_count: 1,
                 variants: [
              {
                       id: 1022535416,
                      sku: "EMP020",
                  option1: "Default Title",
                  option2: nil,
                  option3: nil
              }
          ]
      }
    }

    def with_template(template)
      template_suffix = template.gsub(/^product\.?/, '').gsub(/\.?liquid$/, '')
      if template_suffix.blank?
        PRODUCTS.values.select{|p| p[:template_suffix] == template_suffix }
      else
        PRODUCTS.values.select{|p| p[:template_suffix].blank? }
      end
    end

    def with_name(name)
      PRODUCTS.values.find{|p| p[:title] == name }
    end
  end
end