gendiff:
	node bin/gendiff.js -h

lint:
	npx eslint .

fix:
	npx eslint --fix .

publish:
	npm publish --dry-run
