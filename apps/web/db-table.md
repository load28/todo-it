## todo

```bash
aws dynamodb create-table \
    --table-name todo \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
        AttributeName=date,AttributeType=S \
        AttributeName=userId,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
        AttributeName=date,KeyType=RANGE \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"userId-index\",
                \"KeySchema\": [{
                    \"AttributeName\": \"userId\",
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
                \"IndexName\": \"userId-date-index\",
                \"KeySchema\": [
                    {\"AttributeName\": \"userId\", \"KeyType\": \"HASH\"},
                    {\"AttributeName\": \"date\", \"KeyType\": \"RANGE\"}
                ],
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
