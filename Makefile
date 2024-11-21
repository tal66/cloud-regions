PY = python

.PHONY: azure  
azure: ## update azure
	cd ./azure && go run .

.PHONY: gcp  
gcp: ## update gcp
	$(PY) ./gcp/gcp_data.py

.PHONY: aws  
aws: ## update aws
	$(PY) ./aws/aws_data.py

.PHONY: md  
md: ## csv to md
	$(PY) ./util/csv_to_md.py

.PHONY: help
help:  ## print help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
