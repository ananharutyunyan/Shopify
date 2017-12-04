# find cdn img & replace with asset image of same name
gsub(/src="https://cdn.shopify[^"]*/([^/"?]+(\.[^/"?]+)*)(\?[^"]*)?"/, %q{src="{{ '../assets/images/$1' | asset_url }}"})


# add pjpg
gsub(/((collection|product)_img_url: *['"][^'"]+['"])/, %q{$1, format: 'pjpg'})