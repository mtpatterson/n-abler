<?php

/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _s
 */

if(isset($_POST['submitted'])) {
	if(trim($_POST['contactName']) === '') {
		$nameError = 'Please enter your name.';
		$hasError = true;
	} else {
		$name = trim($_POST['contactName']);
	}

	if(trim($_POST['email']) === '')  {
		$emailError = 'Please enter your email address.';
		$hasError = true;
	} else if (!preg_match("/^[[:alnum:]][a-z0-9_.-]*@[a-z0-9.-]+\.[a-z]{2,4}$/i", trim($_POST['email']))) {
		$emailError = 'You entered an invalid email address.';
		$hasError = true;
	} else {
		$email = trim($_POST['email']);
	}

	if(trim($_POST['comments']) === '') {
		$commentError = 'Please enter a message.';
		$hasError = true;
	} else {
		if(function_exists('stripslashes')) {
			$comments = stripslashes(trim($_POST['comments']));
		} else {
			$comments = trim($_POST['comments']);
		}
	}

	if(!isset($hasError)) {
        $emailTo = get_option('admin_email');

		$subject = '[PHP Snippets] From '.$name;
		$body = "Name: $name \n\nEmail: $email \n\nComments: $comments";
		$headers = 'From: '.$name.' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;

		wp_mail($emailTo, $subject, $body, $headers);
        $emailSent = true;
	}
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="entry-content">
        <?php if ($emailSent) : ?>
            <header class="entry-header my-4">
                <h1>Thank you for contacting us!</h1>
            </header><!-- .entry-header -->
            <p>We will be in touch with you shortly.</p>
            <div>
                In the mean time, take a look at our <a href="/?s=">Catalog</a>.
            </div>
        <?php else : ?>
            <header class="entry-header my-4">
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
            </header><!-- .entry-header -->

            <!-- custom message -->
            <?php the_content(); ?>

            <form action="<?php the_permalink(); ?>" id="contactForm" method="post">
                <input type="hidden" name="submitted" id="submitted" value="true" />
                <div class="form-group">
                    <label for="contactName">Name:</label>
                    <input type="text" name="contactName" id="contactName" value="" class="form-control" />
                    <?php if($nameError != '') { ?>
                        <span class="text-danger"><?=$nameError;?></span>
                    <?php } ?>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" value="" class="form-control" />
                    <?php if($emailError != '') { ?>
                        <span class="text-danger"><?=$emailError;?></span>
                    <?php } ?>
                </div>
                <div class="form-group">
                    <label for="commentsText">Message:</label>
                    <textarea name="comments" id="commentsText" rows="15" cols="30" class="form-control"></textarea>
                    <?php if($commentError != '') { ?>
                        <span class="text-danger"><?=$commentError;?></span>
                    <?php } ?>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-success form-control">Send email</button>
                </div>
            </form>
        <?php endif; ?>

    </div>
</article><!-- #post-<?php the_ID(); ?> -->

