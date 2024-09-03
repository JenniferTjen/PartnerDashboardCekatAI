const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
        </div>
    );
};

export default Loading;
