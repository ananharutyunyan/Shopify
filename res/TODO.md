# Cleanup
## DRY
1. [x] consolidate `assets/product-page.css.liquid` and `assets/product-bottom.css.liquid`
  * [x] `product-page.css` is only used on `templates/product.top-10`, and if you go to any of the products with that template set they say "only available thru top ten list, but I don't see a link to that anywhere. can we delete those products & remove product-top-10?" **can delete**

2. [x] consolidate `assets/product-bottom.css.liquid` and `assets/style.css.liquid` **can consolidate product, product.august, product-bottom and unify in products template suffix**

3. [x] remove inline styles from layouts
  * [x] `theme.liquid`
  * [x] `search.liquid`
5. [x] DRY `snippets/product-page-guides.liquid`
6. [x] put template name as style in body tag, to aid in removing inline template tags

## Block Grid
1. [ ] deal with styles like `.hide-for-desktop .three.columns.thumbnail`
2. [x] replace bdX classes
3. [x] remove colX classes

## Rewrite Grid in Sass
1. [x] extract grid styles to file `assets/styles__grid.scss.liquid`
2. [x] add overhang breakpoints
3. [x] replace media queries with sass media queries based on breakpoint ranges
4. [x] remove `hide-desktop` class (used only  with `bd` classes and header img, and on index template
4. [x] remove `hide-tablet` class (used only  with `bd` classes and on index template)
4. [x] remove `hide-for-mobile` class (used only  with `bd` classes and on index template)
5. [x] unify show-hide classes and collect into grid

## collection-sidebar.liquid
1. [x] extract header with breadcrumb
2. [x] fix breadcrumb grid
3. [x] fix image grids
  * [x] add universal block grid with 2 gutter sizes, based on Foundation 5 block-grid mixin, using a separate scss file
3. [x] fix 768 breakpoint (homepage)
4. [x] consolidate assets/extra-page-styles
5. [x ] fix mobile breakpoint
6. [x] consolidate product-loop to 1, and make thumbnail configurable

## best-seller collection template
1. [x] use templates/collection.best-sellers.liquid as base
2. [x]  parameterize pagination size using metafield
3. [x] remove `if settings.collection_sidebar`
4. [x] consolidate `snippets/best-selling-loop.liquid` and `snippets/2016-best-selling-loop.liquid`  _they were the same, deleted snippets/2016-best-selling-loop.liquid, renamed `snippets/best-selling-loop.liquid` to `snippets/best-sellers__product-loop.liquid`_
5. [x] refactor `snippets/best-sellers__product-loop.liquid`  to use ul & block grid
6. [x] consolidate other loops
7. [x] cleanup `snippets/best-sellers__product-thumbnail.liquid`, similarly to `product-loop`
8. [x] figure out what to do about `if collection.handle == "best-selling-anal-vibrators"`
9. [x move contents to snippets
10. [x] figure out what's causing scrollbar on mobile
11. [ ] **CHECK!!** best-seller sidebar should show parent collection at top, currently doesn't. Also, hide vibrators section

## brand-generic collection template
1. [ ] use snippets from best-seller where possible

## consolidate collection templates
1. [x] extract to snippet
2. [x] `{% include 'masturbator-lp' %}`  if handle starts with `male-toys`
3. [x] put parent collection metafield value in div class, so can style by collection if necessary


## fix https://www.simplipleasure.com/collections/sex-toy-blowout
1. [x] sidebar goes to right side ??? ---> because custom styles
2. [x] cleanup collection.sex-toy-blowout --> use grid styles


## refactor `collection-title`
1. [x ] convert to case/where/assign

## refactor sidebar / filter-menu
1. [x] dupe collection-sidebar.liquid
2. [x] add switches
3. [ ]
4. [x] fix size of font in mobile
5. [x] ensure filter toggle handler only loads once
6. [x] sidebar.liquid -> sidebar__filter-menu.liquid
7. [x] extract sidebar__filter-categories
8. [x] test visibility breakpoints
9. [x] find a page that uses `templates/page.sidebar.liquid` and ensure how it functions (the first unless branch in filter-menu? )
10. [x] see what's in `shop.metafields.pt_filter_menu`
11. [x] fix selected vendor in filters
12. [x] make generic  collection templates all use the collection__template snippet
13. [] refactor collections.lingerie
13. [ ] refactor collections.fleshlight (so can remove collection-sidebar)
13. [ ] refactor collections.mothersday (so can remove collection-sidebar)
14. [ ] page.sidebar

## Drew Issues
1. [x] On product thumbnails, stars+price need to be aligned bottom
2. [x] The style of the was price is wrong, too dark.
3. [x] On vibrators, sometimes price & stars are beside each other
4. [x] top of collections has an extra rule or border -- probably from product bottom styles
5. [ ] Fix alignment of cart on wide desktop, particularly line up the total subheadings with button like on desktop breakpoint
6. [x] **Interstitial is currently not working!!!**
7. [x] Key Benefits list needs bullets, check if any other lists
8. [x] In product list, and breadcrumbs: should be black before clicked, and don't change color for :visited
9. [x] PRODUCT IS ONLY AVAILABLE IN OUR TOP 10 LIST --> put links to the three lists under
10. [x] cleanup product loop logic


## Styles
1. [ ] remove {{ settings.XXX }} and replace with sass vars

## Move page object html/css to templates
1. [ ] create a template for search results page, and move html from page object into it

## Before Deploy
1. [ ] Change all products with product.bottom to ""

## Post Deploy
1. [ ] remove ShappifyHidden
2. [ ] remove product.bottom

# Build System
1. [x] setup node package
2. [x] setup sass processor


# Style Guide
1. [ ] create a page to hold it, and a page theme
2. [ ] create a navigation


# Slider
1. [x] compile a list of plugins to try
  * [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)
  * [FancyBox 3](https://github.com/fancyapps/fancybox) + [BxSlider 4](https://github.com/stevenwanderski/bxslider-4)
  * [FancyBox 3](https://github.com/fancyapps/fancybox) + [Slick Slider](https://github.com/kenwheeler/slick)
2. [x] remove old jquery
3. [ ] add jquery hello world
4. [x] install jquery via yarn]
4. [ ] add jquery cdn link to top
5. [ ] organize head tag
2. [ ] setup a product for each to demo, with a metafield to identify
3. [ ] remove flex slider
4. [ ] incorporate [zoom](http://www.jacklmoore.com/zoom/)



# Questions
1. [x] **best-sellers product loop** has `if product.metafields.inventory.ShappifyHidden == "true"`, normal loop not. Should both have? or can remove? or need switch? -- can remove, but lets do after deploy
2. [x] **product loop** skip logic -- what is the intention? (cleaned up: just skip current product, or if contains tags in skip_tags)