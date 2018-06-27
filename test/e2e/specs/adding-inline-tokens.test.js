/**
 * Node dependencies
 */
import path from 'path';

/**
 * Internal dependencies
 */
import '../support/bootstrap';
import { newPost, newDesktopBrowserPage, getHTMLFromCodeEditor, insertBlock } from '../support/utils';

describe( 'adding inline tokens', () => {
	beforeAll( async () => {
		await newDesktopBrowserPage();
		await newPost();
	} );

	it( 'Should insert inline image', async () => {
		// Create a paragraph.
		await page.click( '.editor-default-block-appender' );

		window.console.log( '@@@1' )

		await page.keyboard.type( 'a ' );

		window.console.log( '@@@2' )

		await insertBlock( 'Inline Image' );

		window.console.log( '@@@3' )

		// Wait for media modal to appear and upload image.
		await page.waitForSelector( '.media-modal input[type=file]' );

		window.console.log( '@@@4' )

		const inputElement = await page.$( '.media-modal input[type=file]' );

		window.console.log( '@@@5' )

		const testImagePath = path.join( __dirname, '..', 'assets', '10x10_e2e_test_image_z9T8jK.png' );

		await inputElement.uploadFile( testImagePath );

		window.console.log( '@@@6' )

		// Wait for upload.
		await page.waitForSelector( '.media-modal li[aria-label="10x10_e2e_test_image_z9T8jK"]' );

		window.console.log( '@@@7' )

		// Insert the uploaded image.
		await page.click( '.media-modal button.media-button-select' );

		window.console.log( '@@@8' )

		// Check the content.
		expect( await getHTMLFromCodeEditor() ).toMatch( /<!-- wp:paragraph -->\s*<p>a\u00A0<img class="wp-image-\d+" style="width:10px" src="[^"]+\/10x10_e2e_test_image_z9T8jK\.png" alt="" \/><\/p>\s*<!-- \/wp:paragraph -->/ );

		window.console.log( '@@@9' )

		// Open the media modal again by inserting inline image
		await insertBlock( 'Inline Image' );

		window.console.log( '@@@10' )

		// Confirm deletion.
		page.on( 'dialog', async ( dialog ) => {
			window.console.log( '@@@15' )
			await dialog.accept();
			window.console.log( '@@@16' )
		} );

		window.console.log( '@@@11' )

		// Wait for media modal to appear and delete image.
		await page.waitForSelector( '.media-modal li.attachment' );

		window.console.log( '@@@12' )

		await page.click( '.media-modal li.attachment' );

		window.console.log( '@@@13' )

		await page.click( '.media-modal button.delete-attachment' );

		window.console.log( '@@@14' )
	} );
} );
