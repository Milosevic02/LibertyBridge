package bridge 

import (
	"std"
	"strconv"
	ownable "gno.land/p/demo/ownable"

)

var balances map[std.Address]int64
var ownableInstance *ownable.Ownable


func init() {
	// Initialize the map
	balances = make(map[std.Address]int64)
	initialOwner = std.Address("0xOwnerAddress") 

	ownableInstance = ownable.NewWithAddress(initialOwner)
}

func Mint(amount int64, addressTo std.Address){
	ownableInstance.AssertCallerIsOwner()
	
	if amount <= 0 {
		panic("Amount can't be 0 or less")
	}
	
	//coin := std.NewCoin("GETH", amount1)

	banker := std.GetBanker(std.BankerTypeRealmIssue)
	banker.IssueCoin(addressTo, "geth", amount)

	balances[addressTo] += amount

	std.Emit("Minted", addressTo.String(), strconv.FormatInt(amount,10))
}

