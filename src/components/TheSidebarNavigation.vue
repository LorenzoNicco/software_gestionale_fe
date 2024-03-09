<template>
    <aside id="sidebar" class="w-1/6 h-full flex flex-col justify-between p-2 bg-cyan-600">
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
                        <router-link to="/" class="btn btn-outline my-aside-btn">
                            <font-awesome-icon :icon="['fas', 'house']" />
    
                            <span>Home</span>
                        </router-link>
                    </li>
                    
                    <li>                    
                        <router-link to="/note" class="btn btn-outline btn btn-outline my-aside-btn">
                            <font-awesome-icon :icon="['fas', 'note-sticky']" />
    
                            <span>Note</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Sezione inferiore -->
        <nav>
            <ul>
                <li>
                    <router-link to="/profile" class="btn btn-outline btn btn-outline my-aside-btn">
                            <font-awesome-icon :icon="['fas', 'user']" />
    
                            <span>Profilo</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>