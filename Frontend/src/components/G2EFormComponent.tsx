import React, { useRef, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { abi } from '../abi';
import { parseEther } from 'viem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const keyframes = `
@keyframes gradientShift {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}`;

const G2EFormComponent: React.FC = () => {
  const { 
    data: hash,
    isPending,
    writeContract,
    error 
  } = useWriteContract();

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (hash) {
      toast.info('Transaction submitted');
    }
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [hash, error]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      onSuccess(data) {
        if (data.status === 1) {
          toast.success('Transaction confirmed!');
        } else {
          toast.error('Transaction failed');
        }
      },
      onError(error) {
        toast.error(`Error checking transaction: ${error.message}`);
      }
    });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get('value') as string;
    const to = formData.get('address') as `0x${string}`;

    try {
      await writeContract({
        address: '0x54e0bc34D8F4597dba4974Aa6554c959448919A4',
        abi,
        functionName: 'deposit',
        args: [to],
        value: parseEther(value),
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      toast.error(`Transaction failed: ${error.message}`);
    }
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '70%',
    height: '60vh',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    position: 'relative'
  };

  const formGroupStyle = {
    position: 'relative',
    padding: '15px 0 0',
    marginTop: '10px',
    width: '70%',
  };

  const inputStyle = {
    fontFamily: 'inherit',
    width: '100%',
    border: '0',
    borderBottom: '3px solid #9b9b9b', // Thicker line
    outline: '0',
    fontSize: '1.3rem',
    color: '#000', // Black text color
    padding: '7px 0',
    background: 'transparent',
    transition: 'border-color 0.2s',
    '::placeholder': {
      color: '#9b9b9b',
    },
    ':focus': {
      borderBottom: '3px solid',
      borderImage: 'linear-gradient(to right, #11998e, #38ef7d)',
      borderImageSlice: 1,
      paddingBottom: '6px',
      fontWeight: '700',
    },
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, red, blue)', // Gradient transition from red to blue
    backgroundSize: '200% 100%',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'background 0.7s ease, color 0.5s ease, transform 0.5s ease', // Slower transitions
    width: '70%',
    display: 'block',
    margin: '20px auto 0 auto',
    animation: 'gradientShift 8s linear infinite', // Slower gradient animation
  };

  return (
    <>
      <style>{keyframes}</style>
      <ToastContainer />
      <form ref={formRef} onSubmit={submit} style={formStyle}>
        <h1 style={{
          fontSize: '62px', /* Increased size for the title */
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, red, blue)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px', /* Reduced space between the title and the ConnectButton */
        }}>GETH 2 ETH</h1>
        <div style={formGroupStyle}>
          <input
            type="text"
            placeholder="Address"
            name="address"
            id="address"
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <input
            type="text"
            placeholder="Amount"
            name="value"
            id="value"
            required
            style={inputStyle}
          />
        </div>
        <button
          disabled={isPending || isConfirming}
          type="submit"
          style={buttonStyle}
        >
          {isPending || isConfirming ? 'Confirming...' : 'Transfer'}
        </button>
      </form>
    </>
  );
};

export default G2EFormComponent;
