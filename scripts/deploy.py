from brownie import SimpleMint, accounts, network

def main():
    # requires brownie account to have been created
    if network.show_active()=='development':
        # add these accounts to metamask by importing private key
        owner = accounts[0]
        SimpleMint.deploy({'from':accounts[0]})
