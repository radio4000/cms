import {CreateForm} from 'components/channels/forms'

export default function Styleguide() {
	return (
		<div>
			<p>
				This page serves as an overview of the styles, patterns and components we use on this site.
			</p>

			<h2>Typography</h2>
			<p>
				Text is based on a font-size of 16px and scales up with the viewport to a maximum of 24px.
				All elements scale along.
			</p>
			<h1>I'm an H1</h1>
			<p>With a paragraph.</p>
			<h2>I'm an H2</h2>
			<p>With a paragraph.</p>
			<h3>I'm an H3</h3>
			<p>With a paragraph.</p>

			<h2>Navigation</h2>
			<p>Here's a normal, horizontal menu:</p>
			<menu>
				<li>
					<a href="#">hey</a>
					<a href="#">you</a>
					<a href="#">rocksteady</a>
					<a href="#">crew</a>
				</li>
			</menu>

			<h2>Forms</h2>
			<CreateForm />

		</div>
	)
}
