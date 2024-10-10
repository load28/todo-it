## todo

```bash
aws dynamodb create-table \
    --table-name todo \
    --attribute-definitions \
        AttributeName=pk,AttributeType=S \
        AttributeName=sk,AttributeType=S \
    --key-schema \
        AttributeName=pk,KeyType=HASH \
        AttributeName=sk,KeyType=RANGE \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"pk-index\",
                \"KeySchema\": [{
                    \"AttributeName\": \"pk\",
                    \"KeyType\": \"HASH\"
                }],
                \"Projection\": {
                    \"ProjectionType\": \"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 5,
                    \"WriteCapacityUnits\": 5
                }
            },
            {
                \"IndexName\": \"sk-index\",
                \"KeySchema\": [{
                    \"AttributeName\": \"sk\",
                    \"KeyType\": \"HASH\"
                }],
                \"Projection\": {
                    \"ProjectionType\": \"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 5,
                    \"WriteCapacityUnits\": 5
                }
            }
        ]" \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://localhost:8000 
```