 GENESIS_FILE="/network/genesis.json"
      CONSENSUS_RPC_API="istanbul"
      NETWORK_ID=$$(cat $${GENESIS_FILE} | grep chainId | awk -F " " '{print $$2}' | awk -F "," '{print $$1}')
      GETH_ARGS_istanbul="--emitcheckpoints --istanbul.blockperiod 1 --mine --miner.threads 1 --syncmode full"
      GETH_ARGS_istanbul="--emitcheckpoints --istanbul.blockperiod 10 --mine --miner.threads 1 --syncmode full"
      if [ ! -f $${DDIR}/control_file ]; then
        mkdir -p $${DDIR}/keystore
        mkdir -p $${DDIR}/geth
@@ -49,7 +49,7 @@ x-masa-testnet-node-v10-def:
services:
  ui:
    extends:
      file: ./src/ui/docker-compose.yml
      file: ./ui/docker-compose.yml
      service: ui
  masa-node:
    << : *masa-testnet-node-v10-def
    hostname: masa-node
    ports:
      - "22001:8545"
    volumes:
      - vol1:/qdata
      - ./network/testnet:/network:ro
    environment:
      - PRIVATE_CONFIG=${PRIVATE_CONFIG:-/qdata/tm/tm.ipc}
      - NODE_ID=1
    networks:
      masa-testnet:
        ipv4_address: 172.16.240.20
networks:
  masa-testnet:
    name: masa-testnet
    driver: bridge
    ipam:
      driver: default
      config:
      - subnet: 172.16.240.0/24
