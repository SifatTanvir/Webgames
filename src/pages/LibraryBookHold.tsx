// ### 1. React Component (LibraryBookHold.tsx) ###
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

// ### EXPORTED CONSTANTS ###
export const TASK_ID_LibraryBookHold = "ebookings-booking-librarybookhold";
export const PASSWORD_LibraryBookHold = "BookObtained";

// ### TYPE DEFINITIONS ###
interface Copy {
  id: string;
  location: string;
  status: 'Available' | 'Checked Out';
}

interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  copies: Copy[];
}

type Page = 'catalog' | 'confirmation';

// ### SVG ICONS ###
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 16c1.255 0 2.443-.29 3.5-.804V4.804zM14.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 0114.5 16c1.255 0 2.443-.29 3.5-.804v-10A7.968 7.968 0 0014.5 4z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;


// ### MAIN COMPONENT ###
const LibraryHold: React.FC = () => {
    const [page, setPage] = useState<Page>('catalog');
    const [searchTerm, setSearchTerm] = useState('');
    const [authorTerm, setAuthorTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [libraryCatalog, setLibraryCatalog] = useState<Book[]>([]);
    const [heldBookIds, setHeldBookIds] = useState<Set<number>>(new Set());
    
    const [isHoldOnCorrectCopy, setIsHoldOnCorrectCopy] = useState(false);
    const [hasMadeIncorrectHold, setHasMadeIncorrectHold] = useState(false);
    
    const [isTaskSuccessful, setIsTaskSuccessful] = useState(false);
    const { recordSuccess } = useTaskAnalytics(TASK_ID_LibraryBookHold);
    const searchRef = useRef<HTMLDivElement>(null);
    const allBooksRef = useRef<Book[]>([]);

    const { targetBookId, targetCopyId, featuredBooks } = useMemo(() => {
        const otherBooks: Omit<Book, 'id' | 'imageUrl' | 'copies'>[] = [
            { title: "The Martian", author: "Andy Weir" }, { title: "Project Hail Mary", author: "Andy Weir" },
            { title: "Neuromancer", author: "William Gibson" }, { title: "Foundation", author: "Isaac Asimov" },
        ];
        const locations = ["Main Branch", "North Annex", "Digital Archive", "West Wing"];
        const statuses: Copy['status'][] = ['Available', 'Checked Out'];
        const generateCopies = (isTarget: boolean): Copy[] => {
            const copies: Copy[] = Array.from({ length: 3 }, (_, i) => ({
                id: `copy-${Date.now()}-${Math.random()}-${i}`,
                location: locations[Math.floor(Math.random() * locations.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
            }));
            if (isTarget && !copies.some(c => c.status === 'Available')) { copies[0].status = 'Available'; }
            return copies;
        };

        const duneCopies = generateCopies(true);
        const firstAvailableCopy = duneCopies.find(c => c.status === 'Available');

        const bookIdToUse = 1;
        const targetBookData = { id: bookIdToUse, title: "Dune", author: "Frank Herbert", imageUrl: `https://picsum.photos/seed/dune/400/600`, copies: duneCopies };
        
        const fullBookList: Book[] = [targetBookData, ...otherBooks.map((book, index) => ({
            id: index + 2, title: book.title, author: book.author,
            imageUrl: `https://picsum.photos/seed/${book.title.replace(/\s/g, '')}/400/600`,
            copies: generateCopies(false),
        }))];
        
        allBooksRef.current = fullBookList;

        const catalogForDisplay = fullBookList.filter(book => book.id !== bookIdToUse);
        setLibraryCatalog(catalogForDisplay.sort(() => Math.random() - 0.5));
        
        return { 
            targetBookId: bookIdToUse, 
            targetCopyId: firstAvailableCopy ? firstAvailableCopy.id : null,
            featuredBooks: [...catalogForDisplay].sort(() => Math.random() - 0.5).slice(0, 4) 
        };
    }, []);

    useEffect(() => {
        if (isHoldOnCorrectCopy && !isTaskSuccessful && !hasMadeIncorrectHold) {
            setIsTaskSuccessful(true);
            recordSuccess();
        }
    }, [isHoldOnCorrectCopy, isTaskSuccessful, hasMadeIncorrectHold, recordSuccess]);
    
    const handleSearch = () => {
        // Search the complete list of books, not just the visible catalog
        const filtered = allBooksRef.current.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
            book.author.toLowerCase().includes(authorTerm.toLowerCase().trim())
        );
        setSearchResults(filtered);
        setHasSearched(true);
    };

    const handleViewBook = (bookId: number) => {
        const bookToShow = allBooksRef.current.find(book => book.id === bookId);
        if (bookToShow) {
            setSearchResults([bookToShow]);
            setHasSearched(true);
            window.scrollTo(0, 0);
        }
    };

    const handlePlaceHold = (bookId: number, copyId: string) => {
        if (heldBookIds.has(bookId)) return;

        if (bookId === targetBookId && copyId !== targetCopyId) {
            setHasMadeIncorrectHold(true);
        }
        
        if (bookId === targetBookId && copyId === targetCopyId) {
            setIsHoldOnCorrectCopy(true);
        }

        setHeldBookIds(prev => new Set(prev).add(bookId));
        // Update the master list of all books
        const newAllBooks = allBooksRef.current.map(book => {
            if (book.id !== bookId) return book;
            const copyIdx = book.copies.findIndex(c => c.id === copyId);
            if (copyIdx === -1) return book;
            const newCopies = [...book.copies];
            newCopies[copyIdx] = { ...newCopies[copyIdx], status: 'Checked Out' };
            return { ...book, copies: newCopies };
        });
        
        allBooksRef.current = newAllBooks;
        
        // Update the visible catalog as well
        setLibraryCatalog(prev => prev.map(book => {
            if (book.id !== bookId) return book;
            const copyIdx = book.copies.findIndex(c => c.id === copyId);
            if (copyIdx === -1) return book;
            const newCopies = [...book.copies];
            newCopies[copyIdx] = { ...newCopies[copyIdx], status: 'Checked Out' };
            return { ...book, copies: newCopies };
        }));

        setPage('confirmation');
    };
    
    const handleRelinquishHold = (bookId: number) => {
        // Find the specific copy that was checked out for this book to make it available again.
        // This assumes only one copy of a book can be on hold by the user at a time.
        const newAllBooks = allBooksRef.current.map(book => {
            if (book.id === bookId) {
                const copyToRelinquishIndex = book.copies.findIndex(c => c.status === 'Checked Out');
                if (copyToRelinquishIndex > -1) {
                    const newCopies = [...book.copies];
                    newCopies[copyToRelinquishIndex] = { ...newCopies[copyToRelinquishIndex], status: 'Available' };
                    return { ...book, copies: newCopies };
                }
            }
            return book;
        });
    
        allBooksRef.current = newAllBooks;
    
        // Update the states to reflect the change
        setHeldBookIds(prevIds => {
            const newIds = new Set(prevIds);
            newIds.delete(bookId);
            return newIds;
        });
    
        // Update the search results with the fresh book data
        setSearchResults(prevResults => {
            return prevResults.map(book => {
                if (book.id === bookId) {
                    return newAllBooks.find(b => b.id === bookId) || book;
                }
                return book;
            });
        });
    
        // Also update the main catalog list
        setLibraryCatalog(prevCatalog => {
            return prevCatalog.map(book => {
                if (book.id === bookId) {
                    return newAllBooks.find(b => b.id === bookId) || book;
                }
                return book;
            });
        });
    };

    const handleReturnToCatalog = () => {
        setPage('catalog');
        setHasSearched(false);
        setSearchTerm('');
        setAuthorTerm('');
    };
    
    const heldBooks = useMemo(() => 
        Array.from(heldBookIds).map(id => allBooksRef.current.find(book => book.id === id)).filter(Boolean) as Book[],
        [heldBookIds, allBooksRef]
    );

    return (
        <div className="bg-slate-100 min-h-screen font-sans flex flex-col">
            <header className="bg-white shadow-md sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleReturnToCatalog}>
                            <BookIcon />
                            <span className="text-2xl font-bold tracking-tight text-slate-800">Digital Library</span>
                        </div>
                    </div>
                </div>
            </header>
            
             {isTaskSuccessful && (
                <div className="bg-green-600 text-white py-3 shadow-lg animate-fade-in sticky top-20 z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="font-bold">
                            Task Complete! Secret Password: <span className="font-mono bg-green-700 px-2 py-1 rounded-md">{PASSWORD_LibraryBookHold}</span>
                        </p>
                    </div>
                </div>
            )}

            <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow w-full">
                {page === 'catalog' && (
                    <div className="animate-fade-in">
                        {!hasSearched && (
                             <section className="relative bg-cover bg-center text-white py-20 sm:py-28 rounded-2xl overflow-hidden mb-12" style={{ backgroundImage: "url('https://picsum.photos/seed/librarybg/1200/400')" }}>
                                <div className="absolute inset-0 bg-slate-800/70"></div>
                                <div className="relative max-w-3xl mx-auto text-center px-4">
                                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Welcome to Your Digital Library</h1>
                                    <p className="mt-6 text-lg text-slate-200">Discover your next great read. Search our extensive catalog or browse our featured titles.</p>
                                    <button onClick={() => searchRef.current?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">Get Started</button>
                                </div>
                            </section>
                        )}
                        <div ref={searchRef} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                            <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Search the Catalog</h2>
                            <div className="flex flex-col sm:flex-row gap-4 items-end mt-6">
                                <div className="flex-1 w-full"><label htmlFor="title-search" className="block text-sm font-medium text-slate-700 mb-1">Title</label><input type="text" id="title-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter Book Name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                                <div className="flex-1 w-full"><label htmlFor="author-search" className="block text-sm font-medium text-slate-700 mb-1">Author</label><input type="text" id="author-search" value={authorTerm} onChange={(e) => setAuthorTerm(e.target.value)} placeholder="Enter Author Name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                                <button onClick={handleSearch} disabled={!searchTerm || !authorTerm} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-slate-400"> <SearchIcon /> <span>Search</span> </button>
                            </div>
                        </div>
                        
                        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">My Holds</h2>
                            {heldBooks.length === 0 ? (
                                <p className="text-slate-500">You currently have no books on hold.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {heldBooks.map(book => (
                                        <li key={`held-${book.id}`} className="p-3 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-center">
                                            <div>
                                                <span className="font-semibold text-slate-700">{book.title}</span>
                                                <span className="text-slate-500"> by {book.author}</span>
                                            </div>
                                            <button
                                                onClick={() => handleRelinquishHold(book.id)}
                                                className="ml-4 px-3 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
                                            >
                                                Relinquish hold
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {hasSearched ? (
                            <div className="mt-12">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-slate-800">{searchResults.length > 0 ? `Search Results (${searchResults.length})` : 'No Results Found'}</h2>
                                    <button onClick={handleReturnToCatalog} className="px-4 py-2 text-sm font-semibold bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors">← Return to Full Catalog</button>
                                </div>
                                <div className="space-y-6">
                                    {searchResults.map(book => (
                                        <div key={book.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border flex flex-col sm:flex-row gap-6">
                                            <img src={book.imageUrl} alt={`Cover of ${book.title}`} className="w-32 h-48 object-cover rounded-lg mx-auto sm:mx-0" />
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold text-slate-800">{book.title}</h3>
                                                <p className="text-slate-600 italic">by {book.author}</p>
                                                <div className="mt-4 pt-4 border-t"><h4 className="font-semibold text-slate-700 mb-2">Copies & Availability</h4>
                                                    <table className="w-full text-sm">
                                                        <tbody>
                                                            {book.copies.map(copy => (
                                                                <tr key={copy.id} className="border-b last:border-b-0">
                                                                    <td className="py-2 px-2">{copy.location}</td>
                                                                    <td className={`py-2 px-2 font-semibold ${copy.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>{copy.status}</td>
                                                                    <td className="py-2 px-2 text-right">
                                                                        {copy.status === 'Available' && !heldBookIds.has(book.id) && (
                                                                            <button onClick={() => handlePlaceHold(book.id, copy.id)} className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full hover:bg-green-200">
                                                                                Place Hold
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                             <>
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Featured Books</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {featuredBooks.map(book => (
                                            <div key={book.id} className="text-center group cursor-pointer" onClick={() => handleViewBook(book.id)}>
                                                <img src={book.imageUrl} alt={book.title} className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow" />
                                                <h4 className="mt-2 font-semibold text-slate-700 group-hover:text-blue-600">{book.title}</h4>
                                                <p className="text-sm text-slate-500">{book.author}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-12"><h2 className="text-2xl font-bold text-slate-800 mb-6">Full Catalog</h2>
                                    <div className="space-y-4">
                                        {libraryCatalog.map(book => {
                                            const availableCopies = book.copies.filter(c => c.status === 'Available').length;
                                            return (<div key={book.id} className="bg-white p-4 rounded-lg shadow-md border"><div className="flex justify-between items-center"><div><h3 className="font-bold text-slate-800">{book.title}</h3><p className="text-sm text-slate-500">by {book.author}</p></div><div className="flex items-center gap-4 ml-4"><div className="text-right"><p className="text-sm font-semibold text-slate-700">Available</p><p className={`font-bold text-lg ${availableCopies > 0 ? 'text-green-600' : 'text-slate-400'}`}>{availableCopies}</p></div><button onClick={() => handleViewBook(book.id)} className="px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors">View</button></div></div></div>);
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
                
                {page === 'confirmation' && (
                     <div className="animate-fade-in text-center max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
                        <CheckCircleIcon />
                        <h1 className="text-4xl font-extrabold text-slate-800 mt-4">Hold Placed!</h1>
                        <p className="mt-4 text-slate-600 text-lg">Your book is now on hold. You will be notified when it's ready for pickup.</p>
                        <button onClick={handleReturnToCatalog} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">Return to Catalog</button>
                      </div>
                )}
            </main>
            <footer className="bg-slate-200 text-slate-600 py-4 mt-8"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm"><p>© {new Date().getFullYear()} Digital Library. All Rights Reserved.</p></div></footer>
        </div>
    );
};

export default LibraryHold;