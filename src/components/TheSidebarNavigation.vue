<template>
    <aside id="sidebar" class="w-1/5 h-full flex flex-col justify-between p-2 bg-red-500">
        <!-- Sezione superiore -->
        <div>
            <!-- LOGO -->
            <div id="logo-container">
                <!-- Logo placeholder -->
                <h2 class="text-xl font-bold">LOGO</h2>
            </div>
    
            <!-- Pulsanti di navigazione -->
            <nav>
                <ul>
                    <li>                    
                        <router-link to="/" class="btn w-full">
                            <font-awesome-icon :icon="['fas', 'house']" />
    
                            <span>Home</span>
                        </router-link>
                    </li>
                    
                    <li>                    
                        <router-link to="/about">
                            <font-awesome-icon :icon="['fas', 'house']" />
    
                            <span>About</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Sezione inferiore -->
        <nav>
            <ul>
                <li>
                    <router-link to="/profile">
                            <font-awesome-icon :icon="['fas', 'user']" />
    
                            <span>Profilo</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>