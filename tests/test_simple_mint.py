from brownie import Wei, reverts


def test_simple_mint_deploy(simple_mint):
    """
    Test if the contract is correctly deployed.
    """
    assert simple_mint.fee() == Wei('0.0025 ether')


def test_simple_mint_minting(accounts, simple_mint):
    """
    Test if the contract can mint an NFT, and charge the
    corresponding fee.
    """
    token_uri = 'https://example.mock/uri.json'

    # can't mint, not paying fee
    with reverts():
        simple_mint.safeMint(token_uri, {'from': accounts[1]})

    # can mint, paying fee
    fee = simple_mint.fee()
    simple_mint.safeMint(token_uri, {'from': accounts[1], 'value': fee})


def test_simple_mint_tokens(accounts, simple_mint):
    """
    Test if the contract can mint an NFT, and charge the
    corresponding fee.
    """
    token_uri = 'https://example.mock/uri.json'
    user_one, user_two = accounts[1], accounts[2]
    fee = simple_mint.fee()

    # minting 3 tokens as user one
    simple_mint.safeMint(token_uri, {'from': user_one, 'value': fee})
    simple_mint.safeMint(token_uri, {'from': user_one, 'value': fee})
    simple_mint.safeMint(token_uri, {'from': user_one, 'value': fee})

    # minting 2 tokens as user two
    simple_mint.safeMint(token_uri, {'from': user_two, 'value': fee})
    simple_mint.safeMint(token_uri, {'from': user_two, 'value': fee})


    user_one_tokens = simple_mint.tokensOf(user_one.address)
    assert len(user_one_tokens) == 3

    # here we assert that the owner of the token is the correct one
    print("--- user one's tokens")
    for token_uri, token_id in user_one_tokens:
        assert simple_mint.ownerOf(token_id) == user_one.address
        print(token_uri, token_id)

    user_two_tokens = simple_mint.tokensOf(user_two.address)
    assert len(user_two_tokens) == 2

    # here we assert that the owner of the token is the correct one
    print("--- user two's tokens")
    for token_uri, token_id in user_two_tokens:
        assert simple_mint.ownerOf(token_id) == user_two.address
        print(token_uri, token_id)


def test_simple_mint_fees(accounts, simple_mint):
    """
    Test if the owner, and the owner only, can change the minting fee.
    """

    fee = simple_mint.fee()
    assert simple_mint.fee() == Wei('0.0025 ether')

    # another user cannot change the minting fee
    with reverts():
        simple_mint.setFee(Wei('0.5 ether'), {'from': accounts[1]})

    # the owner can change the minting fee
    new_fee = Wei('0.0025 ether')
    simple_mint.setFee(new_fee, {'from': accounts[0]})
    assert simple_mint.fee() == new_fee


def test_simple_withdraw(accounts, simple_mint):
    """
    Test if the owner, and the owner only, can withdraw all the
    collected fees.
    """
    fee = Wei('0.5 ether')
    simple_mint.setFee(fee, {'from': accounts[0]})
    initial_balance = accounts[0].balance()
    print(f'Intial balance: {initial_balance}')

    # here we will mint 10 tokens, at a 0.5 ETH fee, this will cost 5 ETH
    # to account one, so the collected fees should amount to 5 ETH
    token_uri = 'https://example.mock/uri.json'
    for i in range(10):
        print(f'mint {i}/10')
        simple_mint.safeMint(
            token_uri, {'from': accounts[1], 'value': fee})
        
    simple_mint.withdraw({'from': accounts[0]})

    # the owner new balance should be:
    # initial_balance + 5 ETH
    new_balance = accounts[0].balance()
    print(f'New balance: {new_balance}')
    assert initial_balance + Wei('5 ether') == new_balance
