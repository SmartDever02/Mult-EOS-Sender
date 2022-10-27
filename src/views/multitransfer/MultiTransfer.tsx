import { useState, ChangeEvent } from 'react';
// @ts-ignore
import MyEOS from 'my-eos';
import 'my-eos/dist/my-eos.css';
import WalletButton from '../../components/Button/WalletButton';
import { toast } from 'react-toastify';

const initState = {
  target: '',
  amount: 0,
};

const myEos = new MyEOS({
  network: {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'api.eosnewyork.io',
    port: 443,
    protocol: 'https',
  },
  scatterAppName: 'Your app name here',
  appName: 'MyApp',
});

var loginResponse: any, authorization: { actor: any; permission: any };

const MultiTransfer = () => {
  const [transactions, setTransactions] = useState<Array<ITransaction>>([
    initState,
  ]);

  const addHandler = () => {
    setTransactions([...transactions, initState]);
  };

  const removeHandler = (index: number) => {
    if (transactions.length <= 1) {
      return;
    }
    const trx = transactions.filter((tr, _id) => _id !== index);
    setTransactions(trx);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    console.log(index, name, value);

    const trx = transactions.map((trx, id) => {
      if (id !== index) {
        return trx;
      }
      return { ...trx, [name]: value };
    });
    setTransactions(trx);
  };

  const connectWalletHandler = async () => {
    console.log('connect wallet func');
    loginResponse = await myEos.login();
    authorization = myEos.getWallet().getAuthorizations()[0];
  };

  const submitHandler = async () => {
    if (loginResponse === undefined || authorization === undefined) {
      toast.warn('You should login first before submit transactions');
      return;
    }

    for (let i = 0; i < transactions.length; i++) {
      const txObject = {
        actions: [
          {
            account: 'eosio.token',
            name: 'transfer',
            authorization: [
              {
                actor: authorization.actor,
                permission: authorization.permission,
              },
            ],
            data: {
              from: authorization.actor,
              to: transactions[i].target,
              quantity: transactions[i].amount + ' EOS',
              memo: transactions[i]?.memo ?? '',
            },
          },
        ],
      };
      const txResult = await myEos.transact(txObject, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
    }
  };

  return (
    <>
      <main className='max-w-screen-md xl:max-w-screen-xl mx-auto pb-20'>
        <div className='mt-20 flex justify-between'>
          <div className='w-[300px]'>Send To:</div>
          <div className='w-[200px]'>Amount:</div>
          <div className='w-[550px]'>Memo:</div>
        </div>
        {transactions.map((trx, index) => (
          <div
            key={'trx' + index}
            className='flex justify-between mt-5 first:mt-10'
          >
            <input
              name='target'
              value={trx.target}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                changeHandler(e, index)
              }
              className='h-10 w-[300px] bg-white shadow-2xl rounded-full outline-none px-5'
            />
            <div className='relative'>
              <input
                type='number'
                name='amount'
                value={trx.amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  changeHandler(e, index)
                }
                className='h-10 w-[200px] bg-white shadow-2xl rounded-full outline-none pl-5 pr-14'
              />
              <span className='absolute right-5 top-1/2 -translate-y-1/2'>
                EOS
              </span>
            </div>
            <div className='flex justify-between w-[550px]'>
              <input
                name='memo'
                value={trx.memo}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  changeHandler(e, index)
                }
                className='h-10 w-[450px] bg-white shadow-2xl rounded-full outline-none px-5'
              />
              <button
                onClick={() => removeHandler(index)}
                className='h-10 w-10 bg-white hover:bg-red-200 hover:text-red-600 active:bg-white transition-all duration-150 shadow-button active:shadow-button-pressed rounded-full flex items-center justify-center'
              >
                <span className='-translate-y-[2px]'>x</span>
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addHandler}
          className='mt-14 flex items-center px-14 h-10 bg-white rounded-full shadow-button active:shadow-button-pressed'
        >
          Add a row
        </button>

        <button
          onClick={submitHandler}
          className='mx-auto mt-14 flex items-center px-14 h-10 bg-white rounded-full shadow-button active:shadow-button-pressed'
        >
          Submit All Transactions
        </button>
      </main>
      <div className='fixed top-8 right-60 -translate-y-1/2'>
        <WalletButton onClick={connectWalletHandler} />
      </div>
    </>
  );
};

export default MultiTransfer;
