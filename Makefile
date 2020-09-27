ci:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff:
	node bin/gendiff.js -h

lint:
	npx eslint .

fix:
	npx eslint --fix .

json:
	npx eslint --format json .

publish:
	npm publish --dry-run

.PHONY: test