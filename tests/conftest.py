import pytest


@pytest.fixture(autouse=True)
def setup(fn_isolation):
    """
    Isolation setup fixture.
    This ensures that each test runs against the same base environment.
    """
    pass


@pytest.fixture(scope="module")
def simple_mint(accounts, SimpleMint):
    """
    Yield a `Contract` object for the SimpleMint contract.
    """
    yield accounts[0].deploy(SimpleMint)
