gendiff:
	node bin/gendiff.js -h

lint:
	npx eslint .

publish:
	npm publish --dry-run
