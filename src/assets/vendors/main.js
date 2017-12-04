(function($) {
	$('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
		effectTime: 300,
        visibleOnly: true
    });



/*

    if($('.paginate .pagenav').length == 0) {
      $('#sort-by-coll').addClass('pages-not-found');
    }


  $('#sort-by-coll .collections-sort-option').each(function(e){
    var sort_by = '{{ collection.sort_by | default: collection.default_sort_by | escape }}';
    if($(this).data('value') == sort_by || '{{ current_tags }}' == $(this).data('value')) {
      $(this).addClass('current');
    }

  	$(this).bind('click', function() {
      var sort_option = $(this).data('value');
      if(sort_option == "best-selling" || sort_option == "price-ascending" || sort_option == "price-descending" || sort_option == "manual") {
        Shopify.queryParams.sort_by = $(this).data('value');
          location.search = $.param(Shopify.queryParams).replace(/\+/g, '%20');
      } else if(sort_option == "sale") {
        var newTags = [];
        {% for tag in current_tags %}
          newTags.push('{{tag}}');
        {% endfor %}

        newTags.push(sort_option);

        if (newTags.length) {
          var query = newTags.join('+');
          //alert(jQuery('{{ 'tag' | link_to_tag: 'tag' }}').attr('href'));
         window.location.href = jQuery('{{ 'tag' | link_to_tag: 'tag' }}').attr('href').replace('tag', query);
        }
      }
    });
  });
*/

	$('#k_id_embedded_subscription_form .action_button.sign_up').click(function(e){
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		var email_val = $('#k_id_embedded_subscription_form .contact_email').val();
		
		if (email_val == '') { 
			$('#error-message').text("Please enter Email address.");
			return false;	
		} else {
			if (!reg.test(email_val)) {
				$('#error-message').text("Please enter valid Email address.");
				return false;
			} else {
				$('#error-message').text("");
				return true;
		    }
		}
	});
	
})(window.jQuery);
