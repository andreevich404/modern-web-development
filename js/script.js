$(function () {
  var $navToggle = $('[data-nav-toggle]');
  var $mainNav = $('[data-nav]');
  var $navLinks = $('[data-nav-link]');
  var $sections = $('[data-section]');
  var $modal = $('[data-modal]');
  var $backToTop = $('[data-back-to-top]');
  var $html = $('html');
  var themeKey = 'theme';
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var scrollDuration = 500;

  var $themeToggle = $('[data-theme-toggle]');

  function syncThemeToggle() {
    $themeToggle.attr('aria-pressed', $html.attr('data-theme') === 'dark' ? 'true' : 'false');
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      $html.attr('data-theme', 'dark');
    } else {
      $html.removeAttr('data-theme');
    }

    syncThemeToggle();
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(themeKey, theme);
    } catch (e) {
      // localStorage может быть недоступен (приватный режим) - тема не сохранится
    }
  }

  $themeToggle.on('click', function () {
    var next = $html.attr('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });

  syncThemeToggle();

  function getHeaderHeight() {
    return $('[data-header]').outerHeight() || 60;
  }

  function scrollToTarget($target) {
    if (!$target.length) {
      return;
    }

    var top = $target.offset().top - getHeaderHeight();
    $('html, body').animate({ scrollTop: Math.max(top, 0) }, scrollDuration);
  }

  $navToggle.on('click', function () {
    var willOpen = !$mainNav.is(':visible');
    $mainNav.stop(true, true).slideToggle(220);
    $navToggle.attr('aria-expanded', willOpen ? 'true' : 'false');
  });

  $mainNav.on('click', '[data-nav-link]', function () {
    if ($(window).width() < 768) {
      $mainNav.stop(true, true).slideUp(180);
      $navToggle.attr('aria-expanded', 'false');
    }
  });

  $(window).on('resize', function () {
    if ($(window).width() >= 768) {
      $mainNav.removeAttr('style');
      $navToggle.attr('aria-expanded', 'false');
    }
  });

  $('a[href^="#"]').on('click', function (event) {
    var href = $(this).attr('href');
    var $target = href === '#' ? $('html') : $(href);

    if (!$target.length) {
      return;
    }

    event.preventDefault();
    scrollToTarget($target);
  });

  function updateActiveNav() {
    var scrollPos = $(window).scrollTop() + getHeaderHeight() + 48;
    var $current = $sections.first();

    $sections.each(function () {
      var $section = $(this);
      if ($section.offset().top <= scrollPos) {
        $current = $section;
      }
    });

    var id = $current.attr('id');
    $navLinks.removeClass('nav__link--active');
    $navLinks.filter('[href="#' + id + '"]').addClass('nav__link--active');
  }

  function updateBackToTop() {
    if ($(window).scrollTop() > 400) {
      $backToTop.stop(true, true).fadeIn(180);
    } else {
      $backToTop.stop(true, true).fadeOut(160);
    }
  }

  $(window).on('scroll', function () {
    updateActiveNav();
    updateBackToTop();
  });

  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, scrollDuration);
  });

  updateActiveNav();
  updateBackToTop();

  function openModal(item) {
    var $modalTags = $modal.find('[data-modal-tags]').empty();

    $modal.find('[data-modal-title]').text(item.title);
    $modal.find('[data-modal-desc]').text(item.description);
    $modal.find('[data-modal-image]').attr({ src: item.image, alt: item.title });

    $.each(item.tags, function (_index, tag) {
      $('<span>', { class: 'tag', text: tag }).appendTo($modalTags);
    });

    $modal
      .addClass('modal--open')
      .attr('aria-hidden', 'false')
      .css('opacity', 0)
      .animate({ opacity: 1 }, 220);
    $('body').addClass('page--locked');
  }

  function closeModal() {
    $modal.animate({ opacity: 0 }, 160, function () {
      $modal.removeClass('modal--open').attr('aria-hidden', 'true').css('opacity', '');
    });
    $('body').removeClass('page--locked');
  }

  $modal.on('click', '[data-modal-close]', closeModal);

  $(document).on('keydown', function (event) {
    if (event.key === 'Escape' && $modal.attr('aria-hidden') === 'false') {
      closeModal();
    }
  });

  function renderPortfolio(items) {
    var $gallery = $('[data-portfolio-gallery]').empty();

    $.each(items, function (index, item) {
      var $card = $('<article>', {
        class: 'portfolio-card',
        tabindex: 0,
        role: 'button'
      });

      $('<img>', {
        class: 'portfolio-card__image',
        src: item.image,
        alt: item.title
      }).appendTo($card);

      var $body = $('<div>', { class: 'portfolio-card__body' }).appendTo($card);
      $('<h3>', { class: 'portfolio-card__title', text: item.title }).appendTo($body);
      $('<p>', { class: 'portfolio-card__desc', text: item.description }).appendTo($body);

      var $tags = $('<p>', { class: 'portfolio-card__tags' }).appendTo($body);
      $.each(item.tags, function (_tagIndex, tag) {
        $('<span>', { class: 'tag', text: tag }).appendTo($tags);
      });

      $('<span>', { class: 'portfolio-card__more', text: 'Подробнее' }).appendTo($body);

      $card.on('click', function () {
        openModal(item);
      });

      $card.on('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(item);
        }
      });

      $card.hide().appendTo($gallery).delay(index * 70).fadeIn(320);
    });
  }

  $.getJSON('data/portfolio.json')
    .done(renderPortfolio)
    .fail(function () {
      $('[data-portfolio-gallery]').html(
        '<p class="portfolio__status">Не удалось загрузить портфолио. Запустите сайт через локальный сервер.</p>'
      );
    });

  var $carousel = $('[data-carousel]');
  var $viewport = $carousel.find('[data-carousel-viewport]');
  var $track = $carousel.find('[data-carousel-track]');
  var $items = $track.children();
  var carouselIndex = 0;
  var carouselTimer = null;
  var carouselInterval = 4000;

  function getVisibleCount() {
    var width = $(window).width();
    if (width >= 1024) {
      return 3;
    }
    if (width >= 768) {
      return 2;
    }
    return 1;
  }

  function getMaxIndex() {
    return Math.max(0, $items.length - getVisibleCount());
  }

  function layoutCarousel() {
    var viewportWidth = $viewport.width();
    var visible = getVisibleCount();
    var gap = parseFloat($track.css('column-gap')) || parseFloat($track.css('gap')) || 0;
    var itemWidth = (viewportWidth - gap * (visible - 1)) / visible;

    $items.css({
      flex: '0 0 ' + itemWidth + 'px',
      width: itemWidth + 'px',
      maxWidth: itemWidth + 'px'
    });
  }

  function getSlideStep() {
    var gap = parseFloat($track.css('column-gap')) || parseFloat($track.css('gap')) || 20;
    var width = $items.get(0).getBoundingClientRect().width;
    var fromOffset = 0;

    if ($items.length > 1) {
      fromOffset = $items.get(1).offsetLeft - $items.get(0).offsetLeft;
    }

    if (fromOffset > 1) {
      return fromOffset;
    }

    return width + gap;
  }

  function goToSlide(nextIndex) {
    layoutCarousel();

    var maxIndex = getMaxIndex();

    if (nextIndex > maxIndex) {
      carouselIndex = 0;
    } else if (nextIndex < 0) {
      carouselIndex = maxIndex;
    } else {
      carouselIndex = nextIndex;
    }

    var offset = carouselIndex * getSlideStep();
    $track.css('transform', 'translateX(-' + offset + 'px)');
  }

  function stopCarousel() {
    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
  }

  function startCarousel() {
    stopCarousel();
    carouselTimer = setInterval(function () {
      goToSlide(carouselIndex + 1);
    }, carouselInterval);
  }

  $carousel.find('[data-carousel-next]').on('click', function () {
    goToSlide(carouselIndex + 1);
    startCarousel();
  });

  $carousel.find('[data-carousel-prev]').on('click', function () {
    goToSlide(carouselIndex - 1);
    startCarousel();
  });

  $carousel.on('mouseenter', stopCarousel).on('mouseleave', startCarousel);

  $(window).on('resize', function () {
    goToSlide(Math.min(carouselIndex, getMaxIndex()));
  });

  function initCarousel() {
    if ($viewport.width() < 40) {
      window.setTimeout(initCarousel, 50);
      return;
    }

    goToSlide(carouselIndex);
    startCarousel();
  }

  initCarousel();
  $(window).on('load', function () {
    goToSlide(carouselIndex);
  });

  var $form = $('[data-contact-form]');
  var $status = $form.find('[data-contact-status]');
  var $submit = $form.find('[data-contact-submit]');
  var $name = $form.find('[name="name"]');
  var $email = $form.find('[name="email"]');
  var $message = $form.find('[name="message"]');

  function setFieldError($input, message) {
    var $error = $('[data-error-for="' + $input.attr('id') + '"]');
    $error.text(message);
    $input.toggleClass('form__input--invalid', Boolean(message));
  }

  function validateForm() {
    var isValid = true;

    if ($.trim($name.val()) === '') {
      setFieldError($name, 'Укажите имя');
      isValid = false;
    } else {
      setFieldError($name, '');
    }

    var email = $.trim($email.val());
    if (email === '') {
      setFieldError($email, 'Укажите email');
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setFieldError($email, 'Введите корректный email');
      isValid = false;
    } else {
      setFieldError($email, '');
    }

    if ($.trim($message.val()) === '') {
      setFieldError($message, 'Напишите сообщение');
      isValid = false;
    } else {
      setFieldError($message, '');
    }

    return isValid;
  }

  $form.on('input', '[data-field]', function () {
    setFieldError($(this), '');
    $status.removeClass('form__status--success form__status--error').text('');
  });

  $form.on('submit', function (event) {
    event.preventDefault();
    $status.removeClass('form__status--success form__status--error').text('');

    if (!validateForm()) {
      return;
    }

    $submit.prop('disabled', true).text('Отправка…');

    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      dataType: 'json',
      data: {
        name: $.trim($name.val()),
        email: $.trim($email.val()),
        message: $.trim($message.val())
      }
    })
      .done(function () {
        $status.addClass('form__status--success').hide().text('Сообщение успешно отправлено!').fadeIn(220);
        $form.trigger('reset');
        $form.find('[data-field]').removeClass('form__input--invalid');
        $form.find('[data-error-for]').text('');
      })
      .fail(function () {
        $status.addClass('form__status--error').hide().text('Не удалось отправить. Попробуйте позже.').fadeIn(220);
      })
      .always(function () {
        $submit.prop('disabled', false).text('Отправить');
      });
  });
});
