import { useState, ChangeEvent } from 'react';

const initState = {
  target: '',
  amount: 0,
};
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

  return (
    <main className='max-w-screen-xl mx-auto pb-20'>
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
        onClick={undefined}
        className='mx-auto mt-14 flex items-center px-14 h-10 bg-white rounded-full shadow-button active:shadow-button-pressed'
      >
        Submit All Transactions
      </button>
    </main>
  );
};

export default MultiTransfer;
